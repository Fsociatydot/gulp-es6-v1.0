import ts from "gulp-typescript"
import webpack from "webpack-stream"
import babel from "gulp-babel"

export const js = () => {
    return app.gulp.src(app.path.src.ts, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(ts({
            extends: "../../tsconfig.json",
            noImplicitAny: true,
            outFile: 'app.js',
            module: 'system',
            moduleResolution: 'node'
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(babel({
			presets: ['@babel/preset-env']
		}))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream())
}