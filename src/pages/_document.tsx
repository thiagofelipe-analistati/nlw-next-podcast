import Document,{html, head, Main, NextScript} from 'next/Document';
 export default class MyDocument extends Document {
    render() {
        return(
            <html>

                <head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet"/>
                </head>
                <body>
                    <Main />
                    <NextScript />
                </body>

            </html>
        )
    }   

 }