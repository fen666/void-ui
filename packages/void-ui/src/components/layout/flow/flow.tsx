import Vue, { CreateElement, VNode } from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { ClassName, Theme, ThemeComponent } from '../../base';

/**
 * Component: Swimlane
 */
@Component
export class VdSwimlane extends Vue implements ThemeComponent {
  @Prop({ type: String })
  public readonly theme?: Theme;
  public get themeValue(): Theme {
    return this.theme || this.$vd_theme.theme;
  }

  @Prop({ type: Boolean, default: false })
  public readonly oddEven!: boolean;
  @Prop({ type: Boolean, default: false })
  public readonly odd!: boolean;
  @Prop({ type: Boolean, default: false })
  public readonly even!: boolean;

  public get classes(): ClassName {
    return [
      {
        [`vdp-theme_${this.themeValue}`]: this.oddEven || this.odd || this.even,
        'is-odd-even': this.oddEven,
        'is-odd': this.odd,
        'is-even': this.even,
      },
    ];
  }

  private render(h: CreateElement): VNode {
    return (
      <div staticClass="vd-swimlane" class={this.classes}>
        {this.$slots.default}
      </div>
    );
  }
}

/**
 * Component: Container
 */
@Component
export class VdContainer extends Vue {
  private render(h: CreateElement): VNode {
    return <div staticClass="vd-container">{this.$slots.default}</div>;
  }
}
