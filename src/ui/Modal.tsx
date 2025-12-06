import { Transition } from "@headlessui/react";
import useOutsideClick from "../hooks/useOutsideClick";
import type React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <Transition
      show={open}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed left-0 top-0 z-50 h-screen w-full bg-slate-800 bg-opacity-30 backdrop-blur-sm">
        <div
          ref={ref}
          className="fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto  sm:max-w-md p-1"
        >
          <h2 className="text-slate-300 font-bold text-xl mb-2 text-center">
            {title}
          </h2>

          <form className="bg-slate-700 rounded-xl p-4 border border-slate-400">
            {children}
          </form>
        </div>
      </div>
    </Transition>
  );
};
export default Modal;
