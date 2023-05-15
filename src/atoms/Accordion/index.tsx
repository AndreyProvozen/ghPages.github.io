import { FC, useState } from 'react';
import AccordionItem from './AccordionItem';

interface Props {
  questions: {
    title: string;
    description: string;
  }[];
}

const Accordion: FC<Props> = ({ questions }) => {
  const [activeQuestions, setActiveQuestions] = useState<string | null>(null);

  const toggleActiveQuestions = (questionId: string) =>
    setActiveQuestions(activeQuestions !== questionId ? questionId : null);

  return (
    <>
      {questions.map(({ title, description }) => (
        <AccordionItem
          title={title}
          description={description}
          key={title}
          isOpened={activeQuestions === title}
          onClick={() => toggleActiveQuestions(title)}
        />
      ))}
    </>
  );
};

export default Accordion;
