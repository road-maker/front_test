import { Plugin, PluginKey } from 'prosemirror-state';
import * as Y from 'yjs';

import { AnnotationState } from './AnnotationState';

export const AnnotationPluginKey = new PluginKey('annotation');

export interface AnnotationPluginOptions {
  HTMLAttributes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  // onUpdate: (items: AnnotationItem[] | [any?]) => {};
  // onUpdate: (items: [any?]) => {};
  // onUpdate: (items: [any?]) => NonNullable<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: Y.Map<any>;
  instance: string;
}

export const AnnotationPlugin = (options: AnnotationPluginOptions) =>
  new Plugin({
    key: AnnotationPluginKey,

    state: {
      init() {
        return new AnnotationState({
          HTMLAttributes: options.HTMLAttributes,
          map: options.map,
          instance: options.instance,
        });
      },
      apply(transaction, pluginState, oldState, newState) {
        return pluginState.apply(transaction, newState);
      },
    },

    props: {
      decorations(state) {
        const { decorations } = this.getState(state);
        const { selection } = state;

        if (!selection.empty) {
          return decorations;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const annotations = this.getState(state).annotationsAt(selection.from);

        // options.onUpdate(annotations);

        return decorations;
      },
    },
  });
