import Header from '../../components/table/Header';
import Cell from '../../components/table/Cell';
import { formatDateTime } from '../../controller/Variables';

import './SubTrans.css'
import '../../../public/styles/common.css'

interface SubsTransactionProps {
    subsTrans: any[];
}

const SubsTransactions_m = ({ subsTrans }:SubsTransactionProps) => {

    return (
        <>
        <div className="App-mobile-responsive-table">
            {subsTrans.map((transaction: any) => (
                <div key={transaction.subsTransID} className="App-mobile-responsive-table-card">
                    <div className="App-mobile-responsive-table-card-title">
                        <h2>{transaction.subscription_name}</h2>
                    </div>
                    <div className="App-mobile-responsive-table-card-data">
                        <div className="App-mobile-responsive-table-card-data-detail">
                            <p className="App-mobile-responsive-table-card-data-title">
                                START
                            </p>
                            <p>{formatDateTime(String(transaction.startDate))}</p>
                        </div>
                        <div className="App-mobile-responsive-table-card-data-detail even-row">
                            <p className="App-mobile-responsive-table-card-data-title">
                                END
                            </p>
                            <p>{formatDateTime(String(transaction.endDate))}</p>
                        </div>
                        <div className="App-mobile-responsive-table-card-data-detail">
                            <p className="App-mobile-responsive-table-card-data-title">
                                SUBS. STATUS
                            </p>
                            <p>{transaction.subsStatus}</p>
                        </div>
                        <div className="App-mobile-responsive-table-card-data-detail even-row">
                            <p className="App-mobile-responsive-table-card-data-title">
                                REASON OF CANCEL
                            </p>
                            <p>{transaction.reasonOfCancel}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default SubsTransactions_m