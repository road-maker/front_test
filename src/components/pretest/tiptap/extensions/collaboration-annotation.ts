/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command, Extension } from '@tiptap/core';
import * as Y from 'yjs';

import { AnnotationPlugin, AnnotationPluginKey } from './AnnotationPlugin';

export interface AddAnnotationAction {
  type: 'addAnnotation';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  from: number;
  to: number;
}

export interface UpdateAnnotationAction {
  type: 'updateAnnotation';
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface DeleteAnnotationAction {
  type: 'deleteAnnotation';
  id: string;
}

export interface AnnotationOptions {
  HTMLAttributes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  /**
   * An event listener which receives annotations for the current selection.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  // onUpdate: (items: AnnotationItem[] | [any?]) => {};
  /**
   * An initialized Y.js document.
   */
  document: Y.Doc | null;
  /**
   * Name of a Y.js map, can be changed to sync multiple fields with one Y.js document.
   */
  field: string;
  /**
   * A raw Y.js map, can be used instead of `document` and `field`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: Y.Map<any> | null;
  instance: string;
}

function getMapFromOptions(options: AnnotationOptions): Y.Map<any> {
  return options.map
    ? options.map
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (options.document.getMap(options.field) as Y.Map<any>);
}

declare module '@tiptap/core' {
  interface Commands {
    annotation: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addAnnotation: (data: any) => Command;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateAnnotation: (id: string, data: any) => Command;
      deleteAnnotation: (id: string) => Command;
    };
  }
}

export const CollaborationAnnotation = Extension.create({
  name: 'annotation',

  defaultOptions: {
    HTMLAttributes: {
      class: 'annotation',
    },
    // onUpdate: (decorations) => decorations,
    document: null,
    field: 'annotations',
    map: null,
    instance: '',
  } as AnnotationOptions,

  onCreate() {
    const map = getMapFromOptions(this.options);

    map.observe(() => {
      // eslint-disable-next-line no-console
      console.log(
        `[${this.options.instance}] map updated  → createDecorations`,
      );

      const transaction = this.editor.state.tr.setMeta(AnnotationPluginKey, {
        type: 'createDecorations',
      });

      this.editor.view.dispatch(transaction);
    });
  },

  addCommands() {
    return {
      addAnnotation:
        (data: any) =>
        ({ dispatch, state }) => {
          const { selection } = state;

          if (selection.empty) {
            return false;
          }

          if (dispatch && data) {
            state.tr.setMeta(AnnotationPluginKey, {
              type: 'addAnnotation',
              from: selection.from,
              to: selection.to,
              data,
            } as AddAnnotationAction);
          }

          return true;
        },
      updateAnnotation:
        (id: string, data: any) =>
        ({ dispatch, state }) => {
          if (dispatch) {
            state.tr.setMeta(AnnotationPluginKey, {
              type: 'updateAnnotation',
              id,
              data,
            } as UpdateAnnotationAction);
          }

          return true;
        },
      deleteAnnotation:
        (id) =>
        ({ dispatch, state }) => {
          if (dispatch) {
            state.tr.setMeta(AnnotationPluginKey, {
              type: 'deleteAnnotation',
              id,
            } as DeleteAnnotationAction);
          }

          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      AnnotationPlugin({
        HTMLAttributes: this.options.HTMLAttributes,
        map: getMapFromOptions(this.options),
        instance: this.options.instance,
      }),
    ];
  },
});
