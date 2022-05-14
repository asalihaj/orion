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
    @observable loadingInitial = false;

    @action getReports = () => {
        let reports = new Array();
        this.reportRegistry.forEach(report => reports.push(report));
        return reports;
    }

    @action loadReports = async () => {
        this.loadingInitial = true;
        try {
            const reports = await agent.Reports.list();
            this.reportRegistry.clear();
            runInAction(() => {
                reports.forEach(report => {
                    this.reportRegistry.set([report.offer, report.username], report);
                    this.loadingInitial = false;
                });
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loadingInitial = false;
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