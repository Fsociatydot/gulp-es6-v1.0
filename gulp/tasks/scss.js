import * as dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css" // сжатие css
import webpcss from "gulp-webpcss" //вывод webp
import autoprefixer from "gulp-autoprefixer" //добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries" //групировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      app.plugins.if(
        app.isDevWebp,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true,
      })
    )
    .pipe(app.gulp.dest(app.path.build.css)) //не сжатый css
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream())
}
