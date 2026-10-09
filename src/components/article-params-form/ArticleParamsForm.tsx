import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent, RefObject } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

type UseSidebarReturn = {
  isSidebarOpen: boolean;
  sidebarRef: RefObject<HTMLDivElement | null>;
  toggleSidebar: () => void;
};

const useSidebar = (): UseSidebarReturn => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef,
    onChange: setIsSidebarOpen,
  });

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return { isSidebarOpen, sidebarRef, toggleSidebar };
};

export const ArticleParamsForm = ({
  articleState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const { isSidebarOpen, sidebarRef, toggleSidebar } = useSidebar();
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const [radioGroupKey, setRadioGroupKey] = useState(0);

  const handleFieldChange =
    <K extends keyof ArticleStateType>(field: K) =>
    (option: ArticleStateType[K]): void => {
      setFormState((prev) => ({ ...prev, [field]: option }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
    setRadioGroupKey((prev) => prev + 1);
  };

  return (
    <div ref={sidebarRef}>
      <ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={handleFieldChange('fontFamilyOption')}
          />

          <RadioGroup
            key={radioGroupKey}
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFieldChange('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFieldChange('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleFieldChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleFieldChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
