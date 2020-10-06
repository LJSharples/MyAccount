import React from "react";
import DataTable from "react-data-table-component";

const Tabs = ({ color, columns, current, active, ended}) => {
  const [openTab, setOpenTab] = React.useState(1);
  const customStyle = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#ffffff',
        paddingLeft: '0 8px',
        backgroundColor: '#63b3ed'
      },
    },
    cells: {
      style: {
        fontSize: '17px',
        color:"#718096",
        hoverColor:"#718096",
        paddingLeft: '0 8px',
      },
    },
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Current Contracts
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Active Contracts
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Ended Contracts
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <DataTable
                    columns={columns}
                    data={current}
                    pagination="true"
                    responsive
                    customStyles={customStyle}/>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <DataTable
                    columns={columns}
                    data={active}
                    pagination="true"
                    responsive
                    customStyles={customStyle}/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <DataTable
                    columns={columns}
                    data={ended}
                    pagination="true"
                    responsive
                    customStyles={customStyle}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
        <Tabs color="blue" columns={this.props.columns}/>
    </>
  );
}
