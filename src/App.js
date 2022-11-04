import logo from './logo.svg';
import './App.css';
import CodeEditorWindow from './CodeEditorWindow';
import { useState } from 'react';
import DropDown from './components/DropDown';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {  FerrisWheelSpinnerOverlay } from 'react-spinner-overlay';
import { useEffect } from 'react';
import { FaCheck,FaWindowClose } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export const languageOptions = [
  {
    id: 63,
    name: "Java",
    label: "Java",
    value: "java",
  },
  {
    id: 75,
    name: "C",
    label: "C",
    value: "c",
  },
  {
    id: 76,
    name: "C++",
    label: "C++",
    value: "cpp",
  },
  {
    id: 70,
    name: "Python",
    label: "Python",
    value: "python",
  },
];


const App = () => {
  const javascriptDefault = `for i in range(1, int(input())+1):
  print(i)`;

  const [theme, setTheme] = useState("cobalt");
  const [testCaseStatus, setTestCaseStatus] = useState();
  const [markStr, setMarkStr] = useState("00/00");
  const [code, setCode] = useState(javascriptDefault);
  const [language, setLanguage] = useState(languageOptions[3]);

  let history = useNavigate ();
  const [timeStr, setTimeStr] = useState("00:00");

  useEffect(() => {
    setLoading(true)
    //console.log("called")

    axios.get('http://localhost/pec/initialData.php', {
      params: {
        stuId: Cookies.get('access_token')
      }
    }).then((response) => {
      
        setMarkStr("00/" + response.data.totalMarks);

        const interval = setInterval(() => {
          var date = new Date(response.data.endTime); 
          var elapsed = date.getTime();
          var current = new Date().getTime();
          
          var millis = elapsed - current;
    
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);

          setTimeStr(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
          setLoading(false)
          

          if(seconds <= 0 && minutes<=0)  {
            setLoading(true)
            clearInterval(interval);
            setTimeStr("00:00")

            Cookies.remove('access_token')
            history("../", { replace: true });
          }
          
          
        }, 1000);
          
       
      });
    }, []);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const run = (s) => {
    setLoading(true)

    axios.get('http://localhost/pec/run.php', {
      params: {
        code: code,
        stuId: Cookies.get('access_token'),
        language: language.value
      }
    }).then((response) => {
      var resp = response.data;

      console.log(response.data)
      
      setMarkStr(String(resp.receivedMarks) + '/' + String(resp.totalMarks))
      setTestCaseStatus(resp.isAccepted)

      setLoading(false)
    });
  };

  const logout = () => {
    setLoading(true)
    Cookies.remove('access_token')
    history("../", { replace: true });
  };

  const ShowIcon = ({ condition}) => {
    if (condition === true) {
      return (
        <FaCheck/>
      );
    } else if(condition === false){
      return (<FaWindowClose/>
      );
    } else 
      return ("");
  };
  

  const [loading, setLoading] = useState(false);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  return (
    <div>
      <div >

        <FerrisWheelSpinnerOverlay
          loading={loading}

          overlayColor="rgba(255,255,255,0.8)"
        />
      </div>
      <div>

        <div style={{
          padding: '5px 0',
          display: 'flex',

          justifyContent: 'center',
        }} >
         
          <DropDown onSelectChange={onSelectChange} />
          <div className="rounded p-1 border border-success" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            marginInlineStart: '10px'
          }}>{timeStr}</div>
          <div className="rounded p-1 border border-success" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            marginInlineStart: '10px'
          }}>{markStr}</div>
          <Button onClick={run} style={{

            marginInlineStart: '10px',
          }} variant="outline-success">Run</Button>
          <Button  style={{

          marginInlineStart: '10px',
          }} variant="outline-success">Show Problem</Button>
          <Button  onClick={logout} style={{

            marginInlineStart: '10px',
            }} variant="outline-danger">Logout</Button>
          <div  style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          marginInlineStart: '10px'
        }}>
            {/* <ShowIcon condition={testCaseStatus}/> */}
          </div>
        </div>
      </div>
      <div>
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={language?.value}
          theme={theme.value}
        />
      </div>

    </div>
  );
}



export default App;
