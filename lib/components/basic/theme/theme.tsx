import Vue, { CreateElement, VNode, PluginFunction } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { Theme } from '@void/ui/lib/components/base/variables';

let $$Vue: typeof Vue | undefined;

export interface ThemeHub {
  readonly theme: Theme;
}

/**
 * A wrapper class component for managing region theme.
 */
@Component
export class VdTheme extends Vue implements ThemeHub {
  // tslint:disable-next-line:function-name
  public static install: PluginFunction<undefined> = $Vue => {
    if ($$Vue && $$Vue === $Vue) {
      return;
    }

    $$Vue = $Vue;

    $Vue.mixin({
      beforeCreate(): void {
        if (!this.$vdTheme) {
          if (this.$options.vdTheme) {
            this.$vdTheme = this.$options.vdTheme;
          } else if (this.$options.parent && this.$options.parent.$vdTheme) {
            this.$vdTheme = this.$options.parent.$vdTheme;
          }
        }
      },
    });
  };

  @Prop({ type: String, default: 'div' })
  public readonly tag!: keyof HTMLElementTagNameMap;

  @Prop({ type: String, required: true })
  public readonly theme!: Theme;

  private beforeCreate(): void {
    this.$vdTheme = this;
  }

  public render(h: CreateElement): VNode {
    return h(
      this.tag,
      {
        staticClass: 'vd-theme',
        class: `vdp-theme_${this.theme}`,
      },
      this.$slots.default,
    );
  }
}
