/* eslint-disable react/no-danger */
import * as React from 'react';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ToggleDisplayOption, {
  useApiPageOption,
} from 'docs/src/modules/components/ApiPage/ToggleDisplayOption';
import SlotsList from './list/SlotsList';
import SlotsTable from './table/SlotsTable';

export type SlotsSectionProps = {
  componentSlots: { class: string; name: string; default: string }[];
  slotDescriptions: { [key: string]: string };
  componentName?: string;
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  spreadHint?: string;
};

export default function SlotsSection(props: SlotsSectionProps) {
  const {
    componentSlots,
    slotDescriptions,
    componentName,
    title = 'api-docs.slots',
    titleHash = 'slots',
    level: Level = 'h2',
    spreadHint,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption('api-page-slots');

  const formatedSlots = componentSlots.map(({ class: className, name, default: defaultValue }) => {
    const description = slotDescriptions[name];
    return {
      description,
      className,
      name,
      defaultValue,
      componentName,
    };
  });

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <Level id={titleHash} style={{ flexGrow: 1 }}>
          {t(title)}
          <a
            aria-labelledby={titleHash}
            className="anchor-link"
            href={`#${titleHash}`}
            tabIndex={-1}
          >
            <svg>
              <use xlinkHref="#anchor-link-icon" />
            </svg>
          </a>
        </Level>

        <ToggleDisplayOption displayOption={displayOption} setDisplayOption={setDisplayOption} />
      </div>

      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}

      {displayOption === 'table' ? (
        <SlotsTable slots={formatedSlots} />
      ) : (
        <SlotsList slots={formatedSlots} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
