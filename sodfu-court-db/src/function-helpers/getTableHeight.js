export const getTableHeight = () => {
    try {            
      let menuHeaderHeight = parseFloat(getComputedStyle(document.getElementsByClassName("p-datatable-header")[0]).height)
      let tableHeaderHeight = parseFloat(getComputedStyle(document.getElementsByClassName("ant-layout-header")[0]).height)
      let paginatorHeight = parseFloat(getComputedStyle(document.getElementsByClassName("p-paginator-bottom")[0]).height)
      let tableHeight = window.innerHeight - paginatorHeight - menuHeaderHeight - tableHeaderHeight - 64;
      document.getElementsByClassName("p-datatable-wrapper")[0].setAttribute("style", `height:${tableHeight}px`)
      return `${tableHeight}px`
    } catch (error) {
        console.error(error);
    }
  }