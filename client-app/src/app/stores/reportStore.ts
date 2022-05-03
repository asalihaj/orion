import { observable, action, configure, runInAction } from 'mobx';
import { IReport, IReportFormValues } from '../models/report';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { string } from 'yup';

configure({enforceActions: 'always'});

export default class ReportStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable reportRegistry = new Map();
    @observable report: IReport | null = null;

    @action getReports = () => {
        return this.reportRegistry;
    }

    @action loadReports = async () => {
        try {
            const reports = await agent.Reports.list();
            runInAction(() => {
                reports.forEach(report => {
                    this.reportRegistry.set([report.offer, report.username], report);
                });
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                throw error;
            })
        }
    }

    @action loadReport = async (offerId: string, username: string) => {
        try {
            let report = this.getReport(offerId, username);
            if (report) {
                this.report = report;
                return report;
            } else {
                try {
                    report = await agent.Reports.details(offerId);
                    runInAction(() => {
                        this.report = report;
                        this.reportRegistry.set([report.offerId, report.username], report);
                    });
                } catch (error) {
                    runInAction(() => {
                        console.log(error);
                        throw error;
                    });
                }
            }
        } catch (error) {
            runInAction(() => {
                console.log(error);
                throw error;
            });
        }
    }

    getReport = (offerId: string, username: string) => {
        return this.reportRegistry.get([offerId, username]);
    }

    @action clearReport = () => {
        this.report = null;
    }

    @action createReport = async (report: IReportFormValues) => {
        try {
            await agent.Reports.create(report);
            runInAction(() => {
                this.reportRegistry.set([report.offerId, report.userId], report);
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}