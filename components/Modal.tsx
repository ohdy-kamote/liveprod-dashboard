'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children, title }: { children: React.ReactNode, title: string }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <button onClick={onDismiss} className="close-button" />
        <p className="modal-title">{title}</p>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
