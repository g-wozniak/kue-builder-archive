export enum Widgets {
   CardsListPage = 'page-cards-list',
   TemplatesListPage = 'page-templates-list',
   TemplatesRevisionSaveAsNewForm = 'page-templates-save-as-new-form',
   TemplateBrowsePage = 'page-template-browse',
   TemplateSettingsPage = 'page-template-settings',
   TemplatePublishModal = 'modal-publish-template',
   NewCardModal = 'modal-new-card',
   NewCardWidgetModal = 'modal-new-card-widget',
   ViewCardWidgetModal = 'modal-view-card-widget'
}

export enum WidgetGroups {
   App = 'app',
   Modals = 'modals',
   CardsListPageLayout = 'cards-list-page-layout',
   TemplateSettingsSidebar = 'template-settings-sidebar',
   RevisionSaveAsNewForm = 'revision-save-as-new-form',
   MixedSavingRevision = 'mixed-saving-revision-as-new',
   BuilderLayout = 'builder-layout',
   BuilderFlow = 'builder-flow'
}

export enum AsyncProcesses {
   PullTemplate = 'proc-pull-template',
   SaveTemplate = 'proc-save-template',
   SaveRevision = 'proc-save-revision',
   DeleteRevision = 'proc-delete-revision',
   PublishTemplate = 'proc-publish-template'
}

export enum TimeToComplete {
   OneMinute = 'min_1',
   FiveMinutes = 'min_5',
   FifteenMinutes = 'min_15',
   ThirtyMinutes = 'min_30',
   OneHour = 'h_1',
   TwoHour = 'h_2',
   FullDay = 'd_1',
   Week = 'w_1',
   Month = 'm_1',
   Custom = 'custom'
}