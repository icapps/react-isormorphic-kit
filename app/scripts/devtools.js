// General imports
import React from 'react';
import ReactDOM from 'react-dom';
import  SliderMonitor from 'redux-slider-monitor';
import ReduxDevTools, {DevTools, DebugPanel,LogMonitor} from 'redux-devtools/lib/react';


const store = window.__STORE__;
if (__DEV__) {
    //ReactDOM.render(
    //    <div>
    //        <DebugPanel top
    //                    bottom
    //                    right>
    //            <DevTools store={store}
    //                      visibleOnLoad={false}
    //                      monitor={LogMonitor}/>
    //        </DebugPanel>
    //        <DebugPanel left
    //                    right
    //                    bottom>
    //            <DevTools store={store}
    //                      visibleOnLoad={false}
    //                      keyboardEnabled
    //                      monitor={SliderMonitor}/>
    //        </DebugPanel>
    //    </div>
    //    , document.getElementById('devtools'));
}
