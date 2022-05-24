import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import History from './History';

const Home = () => {
   const [inputFirstNum, setInputFirstNum] = useState(1);
   const [inputLastNum, setInputLastNum] = useState(100);
   const [answer, setAnswer] = useState(['Primes']);
   const [data, setData] = useState([]);

   useEffect(() => {
      const getData = async () => {
         const { data } = await axios.get('/api/history');
         setData(data);
      };
      getData();
   }, [data]);

   const findPrimes = async (e) => {
      e.preventDefault();
      const num1 = Number(inputFirstNum);
      const num2 = Number(inputLastNum);
      const max = num1 > num2 ? num1 : num2;
      const min = max === num1 ? num2 : num1;

      const sieve = (limit, initial) => {
         let bools = [];
         let primes = [];
         for (let i = 1; i < limit; i++) {
            bools.push(true);
         }
         for (let i = 1; i <= Math.sqrt(limit); i++) {
            if (bools[i - 2]) {
               for (let j = i * 2; j <= limit; j += i) {
                  bools[j - 2] = false;
               }
            }
         }
         for (let i = 0; i < initial - 2; i++) {
            bools[i] = false;
         }
         for (let p = 0; p < bools.length; p++) {
            if (bools[p]) {
               primes.push(p + 2);
            }
         }
         return primes.length === 0 ? ['None in Range'] : primes;
      };

      setAnswer(sieve(max, min));

      const postData = {
         inputStart: inputFirstNum,
         inputEnd: inputLastNum,
         primeNumber: sieve(max, min).join(', '),
         countPrimeNumber: sieve(max, min).length,
      };

      try {
         await axios.post('/api/history', postData);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {}, []);

   return (
      <div>
         <br />
         <br />
         <Container className='w-50'>
            <Form>
               <Form.Label column='lg' lg={6}>
                  Find the Prime Numbers
               </Form.Label>
               <Row className='mb-3'>
                  <Form.Group as={Col}>
                     <Form.Control
                        min='1'
                        max='999999999'
                        name='inputFirstNum'
                        value={inputFirstNum}
                        type='number'
                        onChange={(e) => setInputFirstNum(e.target.value)}
                        placeholder={`${inputFirstNum}`}
                     />
                  </Form.Group>

                  <Form.Group as={Col}>
                     <Form.Control
                        min='1'
                        max='999999'
                        name='inputLastNum'
                        value={inputLastNum}
                        onChange={(e) => setInputLastNum(e.target.value)}
                        type='number'
                        placeholder={`${inputLastNum}`}
                     />
                  </Form.Group>
               </Row>
               <Button
                  className='w-100'
                  variant='primary'
                  onClick={findPrimes}
                  type='submit'>
                  Submit
               </Button>

               <Alert variant='info' className='mt-4'>
                  {answer.join(', ')}
               </Alert>
            </Form>
            <History data={data} />
         </Container>
      </div>
   );
};

export default Home;
