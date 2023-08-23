import { render, screen } from '@testing-library/react';

import QualitiesBlock from './QualityBlock';
import { qualitiesList } from './QualityList';

const setup = () => render(<QualitiesBlock />);

describe('<QualitiesBlock />', () => {
  it('renders QualitiesBlock component', () => {
    setup();

    const qualitiesHeading = screen.getByText('Our qualities');
    expect(qualitiesHeading).toBeInTheDocument();

    qualitiesList.forEach(({ subTitle, title }) => {
      const statisticsTitle = screen.getByText(title);
      expect(statisticsTitle).toBeInTheDocument();

      const statisticsSubTitle = screen.getByText(subTitle);
      expect(statisticsSubTitle).toBeInTheDocument();
    });
  });
});
