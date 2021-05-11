import { CalendarPickerClassKey } from '../CalendarPicker';
import { CalendarPickerSkeletonClassKey } from '../CalendarPickerSkeleton';
import { DateRangePickerDayClassKey } from '../DateRangePickerDay/DateRangePickerDay';
import { LoadingButtonClassKey } from '../LoadingButton';
import { MonthPickerClassKey } from '../MonthPicker';
import { PickersDayClassKey } from '../PickersDay';
import { TabListClassKey } from '../TabList';
import { TabPanelClassKey } from '../TabPanel';
import { TimelineClassKey } from '../Timeline';
import { TimelineConnectorClassKey } from '../TimelineConnector';
import { TimelineContentClassKey } from '../TimelineContent';
import { TimelineDotClassKey } from '../TimelineDot';
import { TimelineItemClassKey } from '../TimelineItem';
import { TimelineOppositeContentClassKey } from '../TimelineOppositeContent';
import { TimelineSeparatorClassKey } from '../TimelineSeparator';
import { TimePickerToolbarClassKey } from '../TimePicker/TimePickerToolbar';
import { TreeItemClassKey } from '../TreeItem';
import { TreeViewClassKey } from '../TreeView';
import { YearPickerClassKey } from '../YearPicker';

// prettier-ignore
export interface LabComponentNameToClassKey {
  MuiCalendarPicker: CalendarPickerClassKey;
  MuiCalendarPickerSkeleton: CalendarPickerSkeletonClassKey;
  MuiClockPicker: ClockPickerClassKey;
  MuiDateRangePickerDay: DateRangePickerDayClassKey;
  MuiLoadingButton: LoadingButtonClassKey;
  MuiMonthPicker: MonthPickerClassKey;
  MuiPickersDay: PickersDayClassKey;
  MuiTabList: TabListClassKey;
  MuiTabPanel: TabPanelClassKey;
  MuiTimeline: TimelineClassKey;
  MuiTimelineConnector: TimelineConnectorClassKey;
  MuiTimelineContent: TimelineContentClassKey;
  MuiTimelineDot: TimelineDotClassKey;
  MuiTimelineItem: TimelineItemClassKey;
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
  MuiTimelineSeparator: TimelineSeparatorClassKey;
  MuiTimePickerToolbar: TimePickerToolbarClassKey;
  MuiTreeItem: TreeItemClassKey;
  MuiTreeView: TreeViewClassKey;
  MuiYearPicker: YearPickerClassKey;
}

declare module '@material-ui/core/styles/overrides' {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

// disable automatic export
export {};
