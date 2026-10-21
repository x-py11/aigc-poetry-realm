import HeroSection from './sections/HeroSection';
import MoodSection from './sections/MoodSection';
import ClassicsSection from './sections/ClassicsSection';
import WorksSection from './sections/WorksSection';
import CommunitySection from './sections/CommunitySection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MoodSection />
      <ClassicsSection />
      <WorksSection />
      <CommunitySection />
    </>
  );
}
