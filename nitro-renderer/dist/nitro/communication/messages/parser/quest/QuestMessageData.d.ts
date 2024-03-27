import { IMessageDataWrapper } from '../../../../../api';
export declare class QuestMessageData {
    private _campaignCode;
    private _completedQuestsInCampaign;
    private _questCountInCampaign;
    private _activityPointType;
    private _id;
    private _accepted;
    private _type;
    private _imageVersion;
    private _rewardCurrencyAmount;
    private _localizationCode;
    private _completedSteps;
    private _totalSteps;
    private _waitPeriodSeconds;
    private _sortOrder;
    private _catalogPageName;
    private _chainCode;
    private _easy;
    private _receiveTime;
    constructor(wrapper: IMessageDataWrapper);
    static getCampaignLocalizationKeyForCode(k: string): string;
    get campaignCode(): string;
    get localizationCode(): string;
    get completedQuestsInCampaign(): number;
    get questCountInCampaign(): number;
    get activityPointType(): number;
    set accepted(k: boolean);
    get accepted(): boolean;
    set id(k: number);
    get id(): number;
    get type(): string;
    get imageVersion(): string;
    get rewardCurrencyAmount(): number;
    get completedSteps(): number;
    get totalSteps(): number;
    get isCompleted(): boolean;
    set waitPeriodSeconds(k: number);
    get waitPeriodSeconds(): number;
    getCampaignLocalizationKey(): string;
    getQuestLocalizationKey(): string;
    get completedCampaign(): boolean;
    get lastQuestInCampaign(): boolean;
    get receiveTime(): Date;
    get sortOrder(): number;
    get catalogPageName(): string;
    get chainCode(): string;
    get easy(): boolean;
}