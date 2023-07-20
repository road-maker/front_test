/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import {
  absolutePositionToRelativePosition,
  relativePositionToAbsolutePosition,
  ySyncPluginKey,
} from 'y-prosemirror';
import * as Y from 'yjs';

import { AnnotationItem } from './AnnotationItem';
import { AnnotationPluginKey } from './AnnotationPlugin';
import {
  AddAnnotationAction,
  DeleteAnnotationAction,
  UpdateAnnotationAction,
} from './collaboration-annotation';

export interface AnnotationStateOptions {
  HTMLAttributes: {
    [key: string]: any;
  };
  map: Y.Map<any>;
  instance: string;
}

export class AnnotationState {
  options: AnnotationStateOptions;

  decorations = DecorationSet.empty;

  constructor(options: AnnotationStateOptions) {
    this.options = options;
  }

  // eslint-disable-next-line class-methods-use-this
  randomId() {
    // TODO: That seems … to simple.
    return Math.floor(Math.random() * 0xffffffff).toString();
  }

  // eslint-disable-next-line consistent-return
  findAnnotation(id: string) {
    const current = this.decorations.find();

    for (let i = 0; i < current.length; i += 1) {
      if (current[i].spec.id === id) {
        return current[i];
      }
    }
  }

  addAnnotation(action: AddAnnotationAction, state: EditorState) {
    const ystate = ySyncPluginKey.getState(state);
    const { type, binding } = ystate;
    const { map } = this.options;
    const { from, to, data } = action;
    const relativeFrom = absolutePositionToRelativePosition(
      from,
      type,
      binding.mapping,
    );
    const relativeTo = absolutePositionToRelativePosition(
      to,
      type,
      binding.mapping,
    );

    map.set(this.randomId(), {
      from: relativeFrom,
      to: relativeTo,
      data,
    });
  }

  updateAnnotation(action: UpdateAnnotationAction) {
    const { map } = this.options;

    const annotation = map.get(action.id);

    map.set(action.id, {
      from: annotation.from,
      to: annotation.to,
      data: action.data,
    });
  }

  deleteAnnotation(id: string) {
    const { map } = this.options;

    map.delete(id);
  }

  annotationsAt(position: number) {
    return this.decorations.find(position, position).map((decoration) => {
      return new AnnotationItem(decoration);
    });
  }

  createDecorations(state: EditorState) {
    const { map, HTMLAttributes } = this.options;
    const ystate = ySyncPluginKey.getState(state);
    const { doc, type, binding } = ystate;
    const decorations: Decoration[] = [];

    map.forEach((annotation, id) => {
      const from = relativePositionToAbsolutePosition(
        doc,
        type,
        annotation.from,
        binding.mapping,
      );
      const to = relativePositionToAbsolutePosition(
        doc,
        type,
        annotation.to,
        binding.mapping,
      );

      if (!from || !to) {
        return;
      }

      // console.log(
      //   `[${this.options.instance}] Decoration.inline()`,
      //   from,
      //   to,
      //   HTMLAttributes,
      //   { id, data: annotation.data }
      // );

      if (from === to) {
        console.warn(
          `[${this.options.instance}] corrupt decoration `,
          annotation.from,
          from,
          annotation.to,
          to,
        );
      }

      decorations.push(
        Decoration.inline(from, to, HTMLAttributes, {
          id,
          data: annotation.data,
          inclusiveEnd: true,
        }),
      );
    });

    this.decorations = DecorationSet.create(state.doc, decorations);
  }

  apply(transaction: Transaction, state: EditorState) {
    // Add/Remove annotations
    const action = transaction.getMeta(AnnotationPluginKey) as
      | AddAnnotationAction
      | UpdateAnnotationAction
      | DeleteAnnotationAction;

    if (action && action.type) {
      console.log(`[${this.options.instance}] action: ${action.type}`);

      if (action.type === 'addAnnotation') {
        this.addAnnotation(action, state);
      }

      if (action.type === 'updateAnnotation') {
        this.updateAnnotation(action);
      }

      if (action.type === 'deleteAnnotation') {
        this.deleteAnnotation(action.id);
      }

      // @ts-ignore
      if (action.type === 'createDecorations') {
        this.createDecorations(state);
      }

      return this;
    }

    // Use Y.js to update positions
    const ystate = ySyncPluginKey.getState(state);

    if (ystate.isChangeOrigin) {
      // console.log(
      //   `[${this.options.instance}] isChangeOrigin: true → createDecorations`
      // );
      this.createDecorations(state);

      return this;
    }

    // Use ProseMirror to update positions
    // console.log(
    //   `[${this.options.instance}] isChangeOrigin: false → ProseMirror mapping`
    // );
    this.decorations = this.decorations.map(
      transaction.mapping,
      transaction.doc,
    );

    return this;
  }
}
