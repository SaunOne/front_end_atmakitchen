import { FirstBanner } from "../../components/userView/home/first-banner";
import { Information } from "../../components/userView/home/information";
import { Description } from "../../components/userView/home/description";

const Home = () => {
    return <>
        <FirstBanner />
        <Information />
        <Description />
        <div className="min-h-screen  py-[50px] px-[50px] md:py-[100px] md:px-[100px]">


        </div>
        
    </>
}

export default Home;