#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <MainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    void matchFh(); //识别输入文本的符号与分割
    ~MainWindow();

private slots:
    void numOnClick();
    void fuHao();
    void equalNum();

private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
