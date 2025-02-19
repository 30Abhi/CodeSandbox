import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useContextModalStore } from '../../../store/ContextModalStore';
import { useFolderContextMenuStore } from '../../../store/folderContextStore';
import { useEditorsocketStore } from '../../../store/editorSocketStore';
import { useFileContextMenuStore } from '../../../store/fileContextStore';

export const FolderContextModal = () => {
    const { isopen: isModalOpen, setIsOpen: ContextModalIsOpen ,FileOrFolder,CreateOrRename} = useContextModalStore();
    const{folder:folderPath}=useFolderContextMenuStore();
    const{file:filePath}=useFileContextMenuStore();

    const [inputValue, setInputValue] = useState('');
    const{editorSocket}=useEditorsocketStore();

    const handleOk = () => {

        ContextModalIsOpen(false)
        
        const newpath=`${folderPath}/${inputValue}`;


        
        if(FileOrFolder=='file'){
            if(CreateOrRename=='create'){
                editorSocket.emit('createFile',{
                    path:newpath
                })
            }

            else if(CreateOrRename=='rename'){
                editorSocket.emit('renameFile',{
                    oldPath:filePath,
                    newFileName:inputValue,
                })
            }

            
        }
        else if(FileOrFolder=='folder'){
            if(CreateOrRename=='create'){
                editorSocket.emit('createFolder',{
                    path:newpath
                })
            }

            else if(CreateOrRename=='rename'){
                editorSocket.emit('renameFolder',{
                    oldPath:folderPath,
                    newFolderName:inputValue,
                })
            }
            
        }
        
    }

    const handleCancel = () => {
        ContextModalIsOpen(false)
    }

    return (

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='here'
                style={{
                    width: '100%',
                    height: '150px', // Adjust height as needed
                    resize: 'vertical', // Allow vertical resizing
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                }}
            />

        </Modal>
    )
}