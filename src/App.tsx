import React, { useState } from 'react';
import './App.css';
import styled from "styled-components";
import Search from './components/Search';
import Button from './components/Button';
import Stat from './components/Stat';
import { ReactComponent as PlusIcon } from  './assets/plus.svg';
import { ReactComponent as UploadCloudIcon } from './assets/upload-cloud.svg';
import ArchiveTable from './components/ArchiveTable/ArchiveTable';
import { Status } from './utils/index';
import Filters from './components/ArchiveTable/Filters';
import FolderInfo from './components/FolderInfos/FolderInfos';
import shallow from 'zustand/shallow'
import { useAppState } from './store/window.store';
import { Box, useBoxStore } from './store/documents.store';




interface Props {
  className?: string
}

let App: React.FC<Props> = () => {

  let [search, setSearch] = useState("");
  const boxes = useBoxStore(state => state.boxes);
  const { folderVisible, toggleFolderVisibility, selectedBox } = useAppState((state) => ({
    folderVisible: state.boxInfoOpened,
    toggleFolderVisibility: state.toggleBoxInfo,
    selectedBox: state.selectedBox
  }), shallow)

  const [statusFilter, setstatusFilter] = useState<Status | undefined>(undefined);

  // const { toggleBoxInfo } = useAppState((state) => ({
  //   // boxInfoOpened: state.boxInfoOpened,
  //   toggleBoxInfo: state.toggleBoxInfo
  // }))

  
  const green =  window.getComputedStyle(document.documentElement).getPropertyValue("--green");
  const red =  window.getComputedStyle(document.documentElement).getPropertyValue("--red");
  const yellow =  window.getComputedStyle(document.documentElement).getPropertyValue("--yellow");

  // console.log({red, green, yellow})

  let stats = [
    {
      text: "présents",
      value: boxes.filter((el:Box) => el.status === Status.PRESENT).length,
      color: green
    },
    {
      text: "invalides",
      value: boxes.filter((el:Box) => el.status === Status.INVALIDE).length,
      color: red
    },
    {
      text: "empruntés",
      value: boxes.filter((el:Box) => el.status === Status.EMPRUNTE).length,
      color: yellow
    },
  ]


  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value)
    setSearch(value)
    console.log(search)
  }

  const onStatusFilter = (status: Status) => {
    setstatusFilter(status);
  }

  

  return (
    <StyledDiv id="main-app-container" >
      <Header>
        <Search value={search} onSearch={onSearch}/>
        <div className="actions">
          <Button onClick={() => toggleFolderVisibility()} icon={<PlusIcon/>}>
            ajouter
          </Button> 
          <SyncButton icon={<UploadCloudIcon />} fabSmall={true}/>
        </div>
      </Header>


      <SectionTitle>statistiques</SectionTitle>
      <StatSection>
        {stats.map(stat => <Stat text={stat.text} key={stat.text} value={stat.value} color={stat.color}/>)}

        <div>
          Total {stats.reduce((acc, el) => el.value + acc , 0)}
        </div>

      </StatSection>

      <Filters onStatusFilter={onStatusFilter} activeFilter={statusFilter} />
      
      <ArchiveTable
        elements={boxes.filter((el: Box) => {
          if (search) {
            return el.name.toLowerCase().includes(search.toLowerCase());
          }
          if (statusFilter) {
            return el.status === statusFilter;
          }
          return true
        })}
      />

      {folderVisible && <FolderInfo box={selectedBox} />}

    </StyledDiv>
  )
}

const SyncButton = styled(Button)`

  margin-left: 10px;

`;


const Header = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & div{
    display: flex;
    justify-content: space-around;
    /* width: 214px; */
  }

`;

const SectionTitle = styled.p`
  font-size: var(--font-titles);
  color: var(--text-color-dimmed);
  font-weight: bold;
  margin-top: 34px;
`;

const StatSection = styled.section`
  background: var(--background-lighter);
  height: 152px;
  width: 100%;
  border-radius: var(--radius);
  margin-top: 8px;
  padding: 16px 32px 16px 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    font-weight: 500;
    font-size: 30px;
    /* line-height: 37px; */
    color: var(--text-color);
    align-self: start;
  }

`;



const StyledDiv = styled.main`

  background: var(--background-dark);
  width: 100vw;
  height: 100vh;
  padding: 24px 48px;

`;

export default App;

