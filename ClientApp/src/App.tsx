import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
//import FetchData from './components/FetchData';
import { PesquisarSistema } from './components/PesquisarSistema';
import { IncluirSistema } from './components/IncluirSistema';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        {<Route path='/pesquisarsistema' component={PesquisarSistema} />}
        {<Route path='/incluirsistema' component={IncluirSistema} />}
    </Layout>
);
