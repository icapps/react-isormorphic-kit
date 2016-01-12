/**
 * Created by mobinni on 12/01/16.
 */
import ejs from 'ejs';
import webpackMw from './webpack';

export default (req, res, next) => {
    webpackMw.query('index.html', function (err, body) {
        if (err) console.log(err);
        let output = ejs.render(body, {
            reactOutput: ''
        });
        res.send(output);
    });
}