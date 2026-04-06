import {
    Navbar, Footer, Hero, LibraryPreview, CollectionsSection, ClubsSection, About
} from "../components/landing";

const Landing = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <LibraryPreview />
            <CollectionsSection />
            <ClubsSection />
            <About />
            <Footer />
        </>
    );
};

export default Landing;