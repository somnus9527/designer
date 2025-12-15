import { Button, message, Select } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import { RollbackOutlined } from "@ant-design/icons";
import { InnerComponentNameEnum } from "@chamn/model";

import {
  DEFAULT_PLUGIN_LIST,
  DesignerSizer,
  DisplaySourceSchema,
  Engine,
  InnerComponentMeta,
} from "@chamn/engine";
import "@chamn/engine/dist/style.css";

import demoMeta from "@athena/demo-material/dist/meta";
import demoComponentUrl from "@athena/demo-material/dist/index.umd.js?url";
import demoComponentCSS from "@athena/demo-material/dist/style.css?url";
import commonMeta from "@chamn/material/dist/meta";
import commonComponentUrl from "@chamn/material/dist/index.umd.js?url";
import commonComponentCSS from "@chamn/material/dist/style.css?url";

import "./index.css";

import type { DesignerPluginInstance } from "@chamn/engine/dist/plugins/Designer/type";
import type { CPageDataType } from "@chamn/model";
import type { EnginContext } from "@chamn/engine";

const win = window as any;
win.React = React;
win.ReactDOM = ReactDOM;
win.ReactDOMClient = ReactDOMClient;

const assetPackagesList = [
  {
    package: demoMeta.pkgName,
    globalName: demoMeta.globalName,
    resources: [
      {
        src: demoComponentUrl,
      },
      {
        src: demoComponentCSS,
      },
    ],
  },
  {
    package: commonMeta.package,
    globalName: commonMeta.globalName,
    resources: [
      {
        src: commonComponentUrl,
      },
      {
        src: commonComponentCSS,
      },
    ],
  },
];

export const EmptyPage: CPageDataType = {
  version: "1.0.0",
  name: "EmptyPage",
  componentsMeta: [],
  componentsTree: {
    componentName: InnerComponentNameEnum.ROOT_CONTAINER,
    props: {},
    children: [],
  },
};

export const Designer = () => {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState<CPageDataType>(EmptyPage);
  const [lang, setLang] = useState(() => {
    const lang = localStorage.getItem("lang") || "zh_CN";
    return lang;
  });

  const engineRef = useRef<EnginContext>();

  useEffect(() => {
    const localPage = localStorage.getItem("pageSchema");
    if (localPage) {
      setPage(JSON.parse(localPage));
    }
    setReady(true);
  }, []);

  const onReady = useCallback(async (ctx: EnginContext) => {
    engineRef.current = ctx;
    engineRef.current?.engine.getI18n()?.changeLanguage(lang);

    const designer =
      await ctx.pluginManager.get<DesignerPluginInstance>("Designer");

    const reloadPage = async () => {
      setTimeout(() => {
        const designerExport = designer?.export;
        console.log("to reload");
        designerExport?.reload();
      }, 0);
    };

    const workbench = ctx.engine.getWorkbench();

    workbench?.replaceTopBarView(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "10px",
        }}
      >
        <div className="logo">Chameleon EG</div>

        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px",
          }}
        >
          {ctx && <DesignerSizer ctx={ctx} />}
        </div>
        <Select
          defaultValue={lang}
          style={{ width: 100, marginRight: "10px" }}
          onChange={(val) => {
            setLang(val);
            engineRef.current?.engine.getI18n()?.changeLanguage(val);
          }}
          options={[
            {
              value: "zh_CN",
              label: "Chinese",
            },
            {
              value: "en_US",
              label: "English",
            },
          ]}
        />
        <a
          target="_blank"
          href="https://hlerenow.github.io/chameleon/documents/"
          rel="noreferrer"
        >
          <Button style={{ marginRight: "10px" }}>Documents </Button>
        </a>
        <a
          target="_blank"
          href="https://github.com/hlerenow/chameleon"
          rel="noreferrer"
        >
          <Button style={{ marginRight: "10px" }}>Github </Button>
        </a>

        <Button
          style={{ marginRight: "10px" }}
          onClick={async () => {
            const res = await ctx.pluginManager.get<any>("History");
            res?.export.preStep();
          }}
        >
          <RollbackOutlined />
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          onClick={async () => {
            const res = await ctx.pluginManager.get<any>("History");
            res?.export.nextStep();
          }}
        >
          <RollbackOutlined
            style={{
              transform: "rotateY(180deg)",
            }}
          />
        </Button>

        <DisplaySourceSchema pageModel={ctx.engine.pageModel} engineCtx={ctx}>
          <Button style={{ marginRight: "10px" }}>Source Code</Button>
        </DisplaySourceSchema>

        <Button
          style={{ marginRight: "10px" }}
          onClick={() => {
            reloadPage();
          }}
        >
          Refresh Page
        </Button>

        <Button
          type="primary"
          onClick={() => {
            const newPage = ctx.engine.pageModel.export();
            localStorage.setItem("pageSchema", JSON.stringify(newPage));
            message.success("Save successfully");
          }}
        >
          Save
        </Button>
      </div>,
    );
  }, []);

  if (!ready) {
    return <>loading...</>;
  }

  return (
    <Engine
      plugins={DEFAULT_PLUGIN_LIST}
      schema={page}
      material={[...InnerComponentMeta, ...demoMeta.meta]}
      assetPackagesList={assetPackagesList}
      onReady={onReady}
    />
  );
};
