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

import type { FormEvent } from 'react';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });

  const handleArrowClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleFontFamilyChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
  };

  const handleFontSizeChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontSizeOption: option }));
  };

  const handleFontColorChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, fontColor: option }));
  };

  const handleBackgroundColorChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, backgroundColor: option }));
  };

  const handleContentWidthChange = (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, contentWidth: option }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
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
            onChange={handleFontFamilyChange}
          />

          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleFontSizeChange}
          />

          <Select
            title="цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={handleFontColorChange}
          />

          <Separator />

          <Select
            title="цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={handleBackgroundColorChange}
          />

          <Select
            title="ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={handleContentWidthChange}
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
