import { I18nManager, Pressable, StyleSheet } from 'react-native';

import { useSetAtom } from 'jotai';

import usePageOverlay from '@/hooks/usePageOverLay';
import { topMenuState } from '@/jotai/atoms';

type Props = {
  index: number;
  dimensions: { customPageWidth: number; customPageHeight: number };
};

export default function PageOverlay({ index, dimensions }: Props) {
  const setShowTopMenu = useSetAtom(topMenuState);

  const { overlay, lineHeight } = usePageOverlay({
    index,
    dimensions,
  });

  return (
    <>
      {overlay.map(({ x: top, y: left, width, aya, surah }) => {
        // Adjust positioning for RTL layout
        const adjustedLeft = I18nManager.isRTL
          ? dimensions.customPageWidth - left - width
          : left;

        return (
          <Pressable
            key={`${surah}-${aya}-${top}-${left}-${width}`}
            accessible={true}
            accessibilityLabel={`aya - ${aya} sura - ${surah}`}
            accessibilityRole="button"
            style={[
              styles.overlay,
              {
                top,
                left: adjustedLeft,
                width,
                height: lineHeight,
              },
            ]}
            onPress={() => setShowTopMenu(true)}
          ></Pressable>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
  },
});
