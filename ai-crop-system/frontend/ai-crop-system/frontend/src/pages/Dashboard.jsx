import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [fields, setFields] = useState([]);
  useEffect(()=>{
    async function load(){
      const res = await api.get('/fields');
      setFields(res.data);
    }
    load();
  },[]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Fields</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f._id} className="p-4 border rounded">
            <h2 className="font-semibold">{f.name}</h2>
            <p>pH: {f.soilProfile?.pH ?? '—'}</p>
            <Link to={`/field/${f._id}`} className="text-sm text-blue-600">Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
