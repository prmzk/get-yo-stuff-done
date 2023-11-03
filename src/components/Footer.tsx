import WTHDialog from "./WTHDialog";

const Footer = () => {
  return (
    <footer className="mt-40 border-t border-gray-400 pt-4">
      <div className="flex justify-between">
        <div>
          <WTHDialog>
            <button className="text-gray-400 underline">
              What the hell is this?
            </button>
          </WTHDialog>
        </div>
        <div className="flex gap-2">
          <p className="text-sm text-gray-400 font-semibold">
            GET YO STUFF DONE
          </p>
          <p className="text-sm text-gray-400 font-semibold">2023</p>
          <p className="text-sm text-gray-400 font-semibold">
            By{" "}
            <a href="https://github.com/prmzk" className="underline">
              prmzk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
