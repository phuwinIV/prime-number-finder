import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import { Container } from 'react-bootstrap';

const History = (props) => {
   const columns = [
      {
         dataField: 'inputStart',
         text: 'inputStart',
      },
      {
         dataField: 'inputEnd',
         text: 'inputEnd',
      },
      {
         dataField: 'primeNumber',
         text: 'primeNumber',
      },
      {
         dataField: 'countPrimeNumber',
         text: 'countPrimeNumber',
      },
      {
         dataField: 'createdAt',
         text: 'createdAt',
         formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
               dateObj = new Date(cell);
            }
            if (cell == null) {
               return;
            }
            return `${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${(
               '0' + dateObj.getDate()
            ).slice(-2)}/${dateObj.getFullYear()}`;
         },
      },
   ];

   return (
      <div>
         <Container className='mt-5'>
            <BootstrapTable
               striped
               hover
               condensed
               keyField='_id'
               data={props.data}
               columns={columns}
            />
         </Container>
      </div>
   );
};

export default History;
