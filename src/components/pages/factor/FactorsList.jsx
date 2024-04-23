import { useEffect, useState } from 'react';

// components
import Factor from './Factor';
import FactorSidebar from './FactorSidebar';


// 
import { getReport, getFactor } from '../../../services/api';


function FactorsList({ defaultMoadi }) {

  const [report, setReport] = useState([])
  const [status, setStatus] = useState([
    {
      "Titel": "در انتظار پردازش",
      "Id": 0,
      "Icon": "icon icon-Refresh",
      "Color": "#1E75D8",
      "background": "#1e75d82e",
      "name": "posted"
    },
    {
      "Titel": "در حال ارسال",
      "Id": 1,
      "Icon": "icon icon-Send",
      "Color": "#3800ff",
      "background": "#3800ff36",
      "name": "queued"
    },
    {
      "Titel": "دارای اشکال",
      "Id": 2,
      "Icon": "icon icon-Document-error",
      "Color": "#FFC014",
      "background": "#ffc0142e",
      "name": "failed"
    },
    {
      "Titel": "خطا هنگام ارسال",
      "Id": 3,
      "Icon": "icon icon-Danger-Triangle",
      "Color": "#D8125E",
      "background": "#d8125e29",
      "name": "failed_while_sending"
    },
    {
      "Titel": "ثبت موفق",
      "Id": 4,
      "Icon": "icon icon-Seen-checkmark",
      "Color": "#1ABF79",
      "background": "#1abf7924",
      "name": "success"
    }
  ])
  const [factor, setFactor] = useState([])

  const { uuid } = defaultMoadi

  useEffect(() => {

    if (!uuid) return;

    const reportHandler = async () => {
      try {
        const res = await getReport(uuid)
        setReport(res)
      } catch (err) {
        if (err.response.data.message === "Unauthenticated.") {
          console.log("mamamamamamad");
        }
      }
    }

    const factorHandler = async () => {
      try {
        const res = await getFactor(uuid)
        setFactor(res)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    reportHandler();
    factorHandler();
  }, [defaultMoadi])

  useEffect(() => {
    const updatedFirstObject = status.map(item => {
      const match = report.find(obj => obj.status == item.name);
      const count = match ? match.count : 0;
      return { ...item, count };
    });
    setStatus(updatedFirstObject)
  }, [report])


  return (
    <div className='factor'>
      <div className="Sidebar">
        <span className='add'>ثبت صورتحساب جدید</span>
        <div className="StatusBox">
          {
            status.map((item, index) => (
              <div key={index} className='item'>
                <i style={{ color: item.Color }} className={item.Icon}></i>
                <span className='title'>{item.Titel}</span>
                <span className='count'>{item.count}</span>
              </div>
            ))
          }
        </div>
      </div>
      <div className="listBox">
        <div className='header'>
          <div className='input_box'>
            <i className='icon icon-Search'></i>
            <input type='text' />
          </div>
          <div className='infoBox'>
            <i className='icon icon-Filter'></i>
            <span className='count'>0</span>
          </div>
        </div>
        <div className="List">
          
        </div>
      </div>
    </div>
  )
}

export default FactorsList