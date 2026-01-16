import SEO from '@/components/seo';
import TutorialGuide from '@/components/TutorialGuide';
import { useTranslation } from '@/hooks/useTranslation';

export default function TutorialScreen() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('seo.tutorial.title')}
        description={t('seo.tutorial.description')}
      />
      <TutorialGuide />
    </>
  );
}
