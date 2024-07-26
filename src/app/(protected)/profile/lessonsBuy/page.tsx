import Header from "../_components/header"
import BuyBox from "./components/buyBox"


const page = () => {
	return (
		<>
		<Header header="Магазин"/>
		<div className="relative">
			<BuyBox />
		</div>
		</>
	)
}

export default page