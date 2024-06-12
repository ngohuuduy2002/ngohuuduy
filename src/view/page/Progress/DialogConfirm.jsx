import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { toast } from 'react-toastify';

export default function DialogConfirm(props) {
    let {
        open,
        handleClose,
        handleYesClick = () => { }
    } = props;

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            scroll="paper"
            open={open}
            onClose={handleClose}
        >
            <DialogContent className="custom-scroll-content">
                <div>
                    <div class="fixed z-10 inset-0 overflow-y-auto">
                        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div class="fixed inset-0 transition-opacity">
                                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                            <div
                                class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg class="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                                            Order confirmation
                                        </h3>
                                        <div class="mt-2">
                                            <p class="text-sm leading-5 text-gray-500">
                                                Make sure the order is not damaged and pay the shipping unit successfully.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                        <button onClick={handleYesClick} type="button"
                                            class="inline-flex min-w-24 justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                            Confirm
                                        </button>
                                    </span>
                                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                        <button onClick={handleClose} type="button"
                                            class="inline-flex min-w-24 justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                            Cancel
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
