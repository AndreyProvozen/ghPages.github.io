import Chevron from '@/icons/svg/Chevron';

const AccordionItem = ({ title, description, isOpened, onClick }) => (
  <div>
    <button className="p-2 cursor-pointer flex justify-between border-b-2 w-full hover:bg-lightPink" onClick={onClick}>
      <h3 className="font-bold text-lg">{title}</h3>
      <Chevron
        width="30px"
        height="30px"
        className={`transform transition ease-out duration-300 ${isOpened ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`transition-max-height ease-in-out duration-300 overflow-hidden ${
        isOpened ? 'max-h-[1000px]' : 'max-h-0'
      }`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);

export default AccordionItem;
