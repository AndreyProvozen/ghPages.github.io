import QualitiesList from './QualityList';

const QualitiesBlock = ({ containerClasses = '' }) => {
  return (
    <div className={containerClasses}>
      <h2 className="text-4xl font-bold mb-5">Our qualities</h2>
      <QualitiesList />
    </div>
  );
};

export default QualitiesBlock;
