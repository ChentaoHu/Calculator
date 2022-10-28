#include "mainwindow.h"
#include <QString>
#include <QToolButton>
#include <QTextCursor>
#include <QVBoxLayout>
#include <iostream>



QString a;
QString b; 
QString texT;
bool Add=false;
bool Sub=false;
bool Mul=false;
bool Div=false;

MainWindow::MainWindow(QWidget *parent): QMainWindow(parent), ui(new Ui::MainWindow){
    ui->setupUi(this);
    this->setWindowIcon(QIcon(":/1.png"));
    ui->plainTextEdit->setPlainText("");
    texT = ui->plainTextEdit->toPlainText();
    QToolButton *numButtons[11]; 
    for(int k=0;k<11;k++)
        QString numName = "num"+ QString::number(k);
        numButtons[k] = MainWindow::findChild<QToolButton *>(numName);
        connect(numButtons[k],SIGNAL(clicked(bool)),this,SLOT(numOnClick()));
    }
    connect(ui->jia,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->jian,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->cheng,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->chu,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->AC,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->shanchu,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->zuoyi,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->youyi,SIGNAL(clicked(bool)),this,SLOT(fuHao()));
    connect(ui->deng,SIGNAL(clicked(bool)),this,SLOT(equalNum()));
}
MainWindow::~MainWindow(){
    delete ui;
}


void MainWindow::numOnClick(){
    QToolButton *numName = (QToolButton*)sender();
    ui->plainTextEdit->textCursor().insertText(numName->text());
    texT = ui->plainTextEdit->toPlainText();
     
    if(Add){
        int i = texT.indexOf("+");
        texT = texT.mid(i+1);
        b = texT;
    }
    else if(Sub)
    {
        int i = texT.indexOf("-");
        texT = texT.mid(i+1);
        b = texT;
    }
    else if(Mul)
    {
        int i = texT.indexOf("×");
        texT = texT.mid(i+1);
        b = texT;
    }
    else if(Div)
    {
        int i = texT.indexOf("÷");
        texT = texT.mid(i+1);
        b = texT;
    }
    else a=texT;
    qDebug()<<a<<b;
}

void MainWindow::fuHao()
{
    QToolButton *fh = (QToolButton*)sender();
    QString f = fh->text();
    if(!(Add||Sub||Mul||Div)){
        if(f == "+")
        {
            Add = true;
            ui->plainTextEdit->textCursor().insertText("+");
        }
        if(f == "-")
        {
            Sub = true;
            ui->plainTextEdit->textCursor().insertText("-");
        }
        if(f == "×")
        {
            Mul = true;
            ui->plainTextEdit->textCursor().insertText("×");
        }
        if(f == "÷")
        {
            Div = true;
            ui->plainTextEdit->textCursor().insertText("÷");
        }
    }

    if(f == "←")
    {
        texT = ui->plainTextEdit->toPlainText();
        texT.chop(1);
        Add=Sub=Mul=Div=false;
        matchFh(); 
        ui->plainTextEdit->setPlainText(texT);
        ui->plainTextEdit->moveCursor(QTextCursor::End);
    }
    if(f == "zuoyi")
        ui->plainTextEdit->moveCursor(QTextCursor::Left);
    if(f == "youyi")
        ui->plainTextEdit->moveCursor(QTextCursor::Right);
    if(f == "AC")
    {
        //a=b=0;
        Add=Sub=Mul=Div=false;
        ui->plainTextEdit->setPlainText("");
    }
}

void MainWindow::matchFh() 
{
    if(texT.contains("+",Qt::CaseSensitive)) 
    {
        QStringList t = texT.split("+");
        a = t[0]; 
        b = t[1];
        Add = true;
    }
    else if(texT.contains("-",Qt::CaseSensitive)) 
    {
        QStringList t = texT.split("-");
        a = t[0];
        b = t[1];
        Sub = true;
    }
    else if(texT.contains("×",Qt::CaseSensitive)) 
    {
        QStringList t = texT.split("×");
        a = t[0];
        b = t[1];
        Mul = true;
    }
    else if(texT.contains("÷",Qt::CaseSensitive)) 
    {
        QStringList t = texT.split("÷");
        a = t[0];
        b = t[1];
        Div = true;
    }
    else a = texT; 
}
void MainWindow::equalNum()
{
    double x;
    double y;
    texT = ui->plainTextEdit->toPlainText();
    matchFh();
    x = a.toDouble();
    y = b.toDouble();
    qDebug()<<"x:"<<x<<"y:"<<y;
    if(Add)
    {
        ui->plainTextEdit->setPlainText(a=QString::number(x+y));
        Add = false;
    }
    if(Sub)
    {
        ui->plainTextEdit->setPlainText(a=QString::number(x-y));
        Sub = false;
    }
    if(Mul)
    {
        ui->plainTextEdit->setPlainText(a=QString::number(x*y));
        Mul = false;
    }
    if(Div)
    {
        ui->plainTextEdit->setPlainText(a=QString::number(x/y));
        Div = false;
    }
    ui->plainTextEdit->moveCursor(QTextCursor::End);
}

