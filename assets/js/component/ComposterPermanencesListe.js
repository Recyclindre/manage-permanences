import React, {Fragment} from "react"
import Composter from './Composter';
import PermancesList from './PermancesList';
import { AppContext } from '../app-context';

class ComposterPermanencesListe extends React.Component {

    render() {
        let appContext = this.context;

        return (
            <Fragment>
                <Composter />
                { appContext.selectedComposter &&
                    <PermancesList />
                }
            </Fragment>

        )
    }
}
ComposterPermanencesListe.contextType = AppContext;

export default ComposterPermanencesListe