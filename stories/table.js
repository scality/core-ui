//@Flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Table from "../src/lib/components/table/Table.component";
import Button from "../src/lib/components/button/Button.component";
import { list } from "./data/list";

const actions = [
  { label: "Edit", onClick: action("Edit clicked") },
  {
    label: "Remove",
    onClick: action("Remove clicked")
  }
];

const listWithActions = list.map(item => {
  return {
    ...item,
    actions
  };
});
const columns = [
  {
    label: "Id",
    dataKey: "id",
    disableSort: false,
    renderer: (data, rowData) => {
      if (data === 3) {
        return (
          <Button
            text={data}
            onClick={event => {
              console.log(rowData);
              event.stopPropagation();
            }}
            size="smaller"
          />
        );
      }
      return <span className="badge">{data}</span>;
    }
  },
  {
    label: "First Name",
    dataKey: "first_name",
    disableSort: false
  },
  {
    label: "Last Name",
    dataKey: "last_name",
    disableSort: false
  },
  {
    label: "Email",
    dataKey: "email",
    disableSort: true
  },
  {
    label: "Ip Address",
    dataKey: "ip_address",
    disableSort: true
  },
  {
    label: "Age",
    dataKey: "age",
    disableSort: false
  }
];

const columnsChangeSize = [
  {
    label: "Id",
    dataKey: "id",
    disableSort: false,
    renderer: data => <span className="badge">{data}</span>,
    width: 50
  },
  {
    label: "First Name",
    dataKey: "first_name",
    disableSort: false,
    width: 150
  },
  {
    label: "Last Name",
    dataKey: "last_name",
    disableSort: false,
    width: 150
  },
  {
    label: "Email",
    dataKey: "email",
    disableSort: true,
    flexGrow: 1
  },
  {
    label: "Ip Address",
    dataKey: "ip_address",
    disableSort: true,
    width: 150
  },
  {
    label: "Age",
    dataKey: "age",
    disableSort: false,
    width: 50
  }
];

storiesOf("Table", module)
  .add("Default", () => {
    return (
      <div style={{ height: "100vh" }}>
        <Table
          list={list}
          columns={columns}
          disableHeader={false}
          headerHeight={40}
          rowHeight={40}
          sortBy={"first_name"}
          sortDirection={"ASC"}
          onSort={action("Sort Clicked")}
          onRowClick={action("Row Clicked")}
        />
      </div>
    );
  })
  .add("With rowActions", () => {
    return (
      <div style={{ height: "100vh" }}>
        <Table
          list={listWithActions}
          columns={columns}
          disableHeader={false}
          headerHeight={40}
          rowHeight={40}
          sortBy={"first_name"}
          sortDirection={"ASC"}
          onSort={action("Sort Clicked")}
          onRowClick={action("Row Clicked")}
        />
      </div>
    );
  })
  .add("Change column size", () => {
    return (
      <div style={{ height: "100vh" }}>
        <Table
          list={listWithActions}
          columns={columnsChangeSize}
          disableHeader={false}
          headerHeight={40}
          rowHeight={40}
          sortBy={"first_name"}
          sortDirection={"ASC"}
          onSort={action("Sort Clicked")}
          onRowClick={action("Row Clicked")}
        />
      </div>
    );
  })
  .add("Empty Table", () => {
    return (
      <div style={{ height: "100vh" }}>
        <Table
          list={[]}
          columns={columns}
          disableHeader={false}
          headerHeight={40}
          rowHeight={40}
          sortBy={"last_name"}
          sortDirection={"DESC"}
          onSort={action("Sort Clicked")}
          onRowClick={action("Row Clicked")}
        />
      </div>
    );
  });
