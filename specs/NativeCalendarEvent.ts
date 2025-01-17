import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  saveCalendarEvent(calendarEventName: string): void;
}

export default TurboModuleRegistry.get<Spec>(
  'NativeCalendarEvent'
) as Spec | null;
