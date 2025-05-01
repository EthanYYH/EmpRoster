import Header from '../../components/table/Header';
import Cell from '../../components/table/Cell';
import { formatDateTime } from '../../controller/Variables';

import './SubTrans.css'
import '../../../public/styles/common.css'

interface SubsTransactionProps {
    subsTrans: any[];
}

const SubsTransactions_t = ({ subsTrans }:SubsTransactionProps) => {

    return (
        <>
        <div className="App-desktop-responsive-table">
            <div className="App-desktop-table-row desktop-table-header">
                <Header className="header-subtransaction-subsPlans" text="SUBS. PLAN" />
                <Header className="header-subtransaction-start" text="START" />
                <Header className="header-subtransaction-end" text="END" />
                <Header className="header-subtransaction-subsStatus" text="SUBS. STATUS" />
                <Header className="header-subtransaction-reason" text="REASON OF CANCEL" />
            </div>

            {subsTrans.map((transaction: any) => (
            <div className="App-desktop-table-row table-body" key={transaction.subsTransID}>
                <Cell className="body-subtransaction-subsPlans" text={transaction.subscription_name} />
                <Cell className="body-subtransaction-start" text={formatDateTime(String(transaction.startDate))} />
                <Cell className="body-subtransaction-end" text={formatDateTime(String(transaction.endDate))} />
                <Cell className="body-subtransaction-subsStatus" text={transaction.subsStatus} />
                <Cell className="body-subtransaction-reason" text={transaction.reasonOfCancel} />
            </div>
            ))}
        </div>
        </>
    )
}

export default SubsTransactions_t