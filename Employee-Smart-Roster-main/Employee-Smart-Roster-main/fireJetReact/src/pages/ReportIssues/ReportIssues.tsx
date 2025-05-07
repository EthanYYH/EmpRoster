import { useEffect, useState } from 'react'
import { USER_ROLE } from '../../controller/Variables'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import ReportIssuesController from '../../controller/ReportIssuesController'

import './ReportIssues.css'
import "../../../public/styles/common.css"

const { getAllReportedIssues } = ReportIssuesController

const ReportIssues: React.FC = () => {
    const { showAlert } = useAlert()
    const { user } = useAuth()
    const [issues, setIssues] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllReportedIsses = async () => {
        try {
            const reportedIssues = await getAllReportedIssues (user?.UID)
            console.log(reportedIssues)
           
        } catch (error) {
            showAlert(
                'fetchAllReportedIsses',
                '',
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }
    useEffect(() => {
        fetchAllReportedIsses()
    }, [user])

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Reported Issues</h1>
            {issues.length === 0 ? (
                <p>No reported issues found.</p>
            ) : (
                <ul>
                    {issues.map((issue: any) => (
                        <li key={issue.id}>
                            <h2>{issue.title}</h2>
                            <p>{issue.description}</p>
                            <p>Status: {issue.status}</p>
                            <p>Reported on: {new Date(issue.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReportIssues;