import defaultTheme from '@/ThemeProvider/defaultTheme';

import { Shape, ShapeOptions } from './shape';
import { Spacing, SpacingOptions } from './spacing';
import { Common, Hues, Mode } from './palette';

export interface DefaultTheme {
  colors?: Record<string, Partial<Hues & Common>>;
  components?: Record<string, any>;
  palette: typeof defaultTheme.palette;
  shadows?: unknown;
  shape: Shape;
  spacing: Spacing;
  typography?: unknown;
  zIndex?: unknown;
}

export interface ThemeOptions {
  colors?: Record<string, any>;
  components?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: unknown;
  shape?: ShapeOptions;
  spacing?: SpacingOptions;
  typography?: unknown;
  zIndex?: Record<string, number>;
}

export interface ThemeContextInterface<Theme = DefaultTheme> {
  theme: Partial<Theme>;
}

export type ThemeProcessorFn = <Theme = DefaultTheme>(outerTheme: Theme) => Theme;
export type CustomThemeType<Theme = DefaultTheme> = Partial<Theme> | ThemeProcessorFn;

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  location?: string; // helpful for troubleshooting multiple theme providers
  theme?: CustomThemeType<Theme>;
}

export interface UseThemeProps<Theme = DefaultTheme> {
  customTheme?: CustomThemeType<Theme>;
}
