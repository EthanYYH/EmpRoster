import Header from '../../../components/table/Header';
import Cell from '../../../components/table/Cell';

import '../SubsTrans.css'
import '../../../../public/styles/common.css'

interface SubsTransViewProps {
    transactions: any;
}

const SubsTrans_t = ({transactions}: SubsTransViewProps) => {

    return(
        <>
        <div className="App-desktop-responsive-table">
            <div className="App-desktop-table-row desktop-table-header">
                <Header className="header-subtransaction-REF" text="REF" />
                <Header className="header-subtransaction-UEN" text="UEN" />
                <Header className="header-subtransaction-bizName" text="BIZ NAME" />
                <Header className="header-subtransaction-startDate" text="START" />
                <Header className="header-subtransaction-endDate" text="END" />
                <Header className="header-subtransaction-subsStatus" text="PAYMENT STATUS" />
                <Header className="header-subtransaction-reason" text="REASON OF CANCEL" />
            </div>

            {transactions.map((transaction: any) => (
            <div className="App-desktop-table-row table-body" key={transaction.subsTransID}>
                <Cell className="cell-subtransaction-REF" text={transaction.reference_number} />
                <Cell className="cell-subtransaction-UEN" text={transaction.UEN} />
                <Cell className="cell-subtransaction-bizName" text={transaction.bizName} />
                <Cell className="cell-subtransaction-startDate" text={transaction.startDate} />
                <Cell className="cell-subtransaction-endDate" text={transaction.endDate} />
                <Cell className="cell-subtransaction-subsStatus" text={transaction.subsStatus} />
                <Cell className="cell-subtransaction-reason" text={transaction.reasonOfCancel} />
            </div>
            ))}
        </div>
        </>
    )
}

export default SubsTrans_t