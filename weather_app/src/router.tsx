import AlertList from "components/alerts/AlertList"
import ForecastList from "components/forecast/ForecastList"
import { Routes, Route } from "react-router-dom"


function Router(): JSX.Element {
    return <Routes>
        <Route path="/" element={<AlertList />} />
        <Route path="/alerts" element={<AlertList />} />
        <Route path="/forecast" element={<ForecastList />} />
    </Routes>
}


export default Router