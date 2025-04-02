import { scaleFont } from './mixins';
import { useFonts } from 'expo-font';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'BeVietnamPro-Regular';
export const FONT_FAMILY_SEMIBOLD = 'BeVietnamPro-SemiBold';
export const FONT_FAMILY_BOLD = 'BeVietnamPro-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_SEMIBOLD = '500';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_48 = scaleFont(48);
export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_48 = scaleFont(48);
export const LINE_HEIGHT_40 = scaleFont(40);
export const LINE_HEIGHT_32 = scaleFont(32);
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);
export const LINE_HEIGHT_14 = scaleFont(14);
export const LINE_HEIGHT_12 = scaleFont(12);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_SEMIBOLD = {
  fontFamily: FONT_FAMILY_SEMIBOLD,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export function loadFonts(){
    const [fontsLoaded] = useFonts({
        'BeVietnamPro-Regular': require('../assets/fonts/BeVietnamPro-Regular.ttf'),
        'BeVietnamPro-Bold': require('../assets/fonts/BeVietnamPro-Bold.ttf'),
        'BeVietnamPro-SemiBold': require('../assets/fonts/BeVietnamPro-SemiBold.ttf'),
      });
}